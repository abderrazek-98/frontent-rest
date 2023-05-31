import { Component, Input,OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  @Input()
  visible = false;
  @Input()
  notFoundMessage = "rien n'a été trouvé!";
  @Input()
  resetLinkText = "Réinitialiser";
  @Input()
  resetLinkRoute = "/category";
  constructor() { }

  ngOnInit(): void {
  }

}
