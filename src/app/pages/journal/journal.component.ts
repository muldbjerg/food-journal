import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subscription, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent implements OnInit {
  subscriptions = new Subscription();
  itemsByDate: any;
  userUid: any;

  constructor(
    public authService: AuthService,
    public itemsService: ItemsService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.getItems();
    }
  }

  getItems() {
    this.userUid = JSON.parse(localStorage.getItem('user')!)['uid'];
    var allFoodQuery = this.db.object(`entries/${this.userUid}`).valueChanges();

    if (typeof allFoodQuery === 'object') {
      this.subscriptions.add(
        allFoodQuery
          .pipe(
            map((query: any) => {
              if (query) {
                return Object.values(query);
              } else {
                return;
              }
            })
          )
          .subscribe((items: any) => {
            this.itemsByDate = Object.values(
              this.groupItems(items, ['timestamp'])
            );
          })
      );
    }
  }

  groupItems(array: any, path: any) {
    var reducer = (groups: any, item: any) => {
      var date = new Date(this.getValue(item, path));
      var simpleDate =
        date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
      var group = groups[simpleDate] || (groups[simpleDate] = []);
      group.push(item);
      return groups;
    };
    return array.reduce(reducer, {});
  }

  getValue(object: any, path: any) {
    var reducer = (tmp: any, key: any) => {
      return tmp[key];
    };
    return path.reduce(reducer, object);
  }
}
