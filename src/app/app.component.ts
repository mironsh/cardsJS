import {Component} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('cardLocation', [
      state('0', style({transform: 'translate(0, 0)'})),
      state('1', style({transform: 'translate(20rem, 0)'})),
      state('2', style({transform: 'translate(40rem, 0)'})),
      state('3', style({transform: 'translate(60rem, 0)'})),
      state('4', style({transform: 'translate(80rem, 0)'})),
      state('5', style({transform: 'translate(0, 25rem)'})),
      state('6', style({transform: 'translate(20rem, 25rem)'})),
      state('7', style({transform: 'translate(40rem, 25rem)'})),
      state('8', style({transform: 'translate(60rem, 25rem)'})),
      state('9', style({transform: 'translate(80rem, 25rem)'})),
    ])
  ]
})
export class AppComponent {
  // Number of cards on the screen
  readonly numOfCards = 10;
  // An array of arbitrary names
  readonly catNames: string[] = ['Elik', 'Milki', 'Puss', 'Smokey', 'Misty', 'Tigger', 'Kitty', 'Oscar', 'Missy', 'Max'];
  /**
   * This array of objects contains all the data on composition and location of items on the screen
   * @type {any[]}
   */
  cards: { index: number, position: number, image: string, name: string, likes: number }[] = [];

  public constructor() {
    for (let i = 0; i < this.numOfCards; i++) {
      let card = {
        index: i,
        position: i,
        image: 'cat' + (i + 1) + '.jpg',
        name: this.catNames[i],
        likes: 0
      };
      this.cards.push(card);
    }
  }

  /**
   * React to a user button action
   * @param index Item index whose button was pressed
   */
  public liked(index) {
    this.cards[index].likes++;
    this.rearrange();
  }

  /**
   * Set cards items "position" attribute to reflect their respective positions based on the "likes" attribute.
   */
  public rearrange() {
    // Create a copy of the cards array sored by the likes attribute
    let cardsCopy = _.sortBy(this.cards, function (item) {
      return -item.likes;
    });

    for (let indx = 0; indx < this.cards.length; indx++) {
      this.cards[indx].position = _.findIndex(cardsCopy, {index: this.cards[indx].index});
    }
  }
}
