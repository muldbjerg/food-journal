import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  foodItem: string = '';
  userUid?: string;

  allFood: any;

  constructor(
    public authService: AuthService,
    public itemsService: ItemsService,
    private db: AngularFireDatabase
  ) {}

  async ngOnInit() {
    if (localStorage.getItem('user')) {
      this.userUid = JSON.parse(localStorage.getItem('user')!)['uid'];

      var allFoodQuery = this.db
        .object(`entries/${this.userUid}`)
        .valueChanges();

      if (typeof allFoodQuery === 'object') {
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
            console.log(items);
            this.allFood = items;
          });
      }
    }
  }

  saveItem() {
    var entriesRef = this.db.object(
      `entries/${this.userUid}/${this.db.createPushId()}`
    );
    entriesRef.set({ item: this.foodItem, timestamp: new Date().getTime() });
  }
}
