import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private db: AngularFireDatabase) {}

  getMyFoodItem(userUid: string) {
    // return new Promise<JSON>((resolve) => {
    //   this.db
    //     .object(`entries/${userUid}`)
    //     .valueChanges()
    //     .pipe(
    //       map((response: any) => JSON.stringify(response)),
    //       map((response: any) => JSON.parse(response))
    //     )
    //     .subscribe((foodItems: any) => resolve(foodItems));
    // });
    return this.db.list(`entries/${userUid}`);
  }
}
