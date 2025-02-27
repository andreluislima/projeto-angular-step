import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobServiceService } from '../../services/job-service.service';

@Component({
  selector: 'app-badges',
  imports: [CommonModule],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.css'
})
export class BadgesComponent {
  @Input() text:string = '';
  @Input() color:string = 'hsl(180, 29%, 50%)';
  // @Input() width:string = '100%';
  @Input() type: 'new' | 'featured' = 'new';
  
job: any;

}
