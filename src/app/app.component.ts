import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

export interface Todos {
  userId:number;
  id:number;
  title:string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  dtOptions: DataTables.Settings = {};
  todos:any = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    }

    this.http.get<Todos[]>('../assets/data.json')
        .subscribe(data => {
          // console.log(data);
          this.todos = data;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });
  }

}
