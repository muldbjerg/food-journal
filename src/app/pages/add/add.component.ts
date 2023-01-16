import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  @ViewChild('input') input!: ElementRef;

  subscriptions = new Subscription();
  foodItem: string = '';
  userUid?: string;
  today = new Date().getTime();

  constructor(
    public authService: AuthService,
    public itemsService: ItemsService,
    private db: AngularFireDatabase
  ) {}

  async ngOnInit() {
    if (localStorage.getItem('user')) {
    }

    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 0);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  saveNewItem(event: any) {
    event.preventDefault();

    if (this.foodItem === '') {
      console.log('no content');
      return;
    }

    this.userUid = JSON.parse(localStorage.getItem('user')!)['uid'];
    var key = this.db.createPushId();

    var entriesRef = this.db.object(`entries/${this.userUid}/${key}`);
    entriesRef.set({
      item: this.foodItem,
      timestamp: new Date().getTime(),
      key: key,
    });

    this.foodItem = '';
    this.input.nativeElement.focus();
  }
}
