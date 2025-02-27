import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  id: number;
  logo:string;
  company: string;
  role: string;
  level: string;
  languages: string[];  
  tools: string[]; 
  position:string[];
  postedAt:string[];
  contract:string[];
  location:string[];
  new:boolean;
  featured:boolean;
}

@Injectable({
  providedIn: 'root'
})

export class JobServiceService {

  private apiUrl = '/data.json';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }
}
