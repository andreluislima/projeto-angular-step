import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobServiceService, Job } from '../../services/job-service.service';
import { PesquisaComponent } from '../pesquisa/pesquisa.component';
import { BadgesComponent } from '../badges/badges.component';

@Component({
  selector: 'app-cards-vagas',
  standalone: true,
  imports: [CommonModule, PesquisaComponent],
  templateUrl: './cards-vagas.component.html',
  styleUrls: ['./cards-vagas.component.css']
})
export class CardsVagasComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchFilters: string[] = [];

  constructor(private jobService: JobServiceService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => {
        console.log("Dados carregados:", data);
        this.jobs = data;
        this.filteredJobs = data;
      },
      error: (err) => {
        console.error("Erro ao carregar os dados:", err);
      }
    });
  }

  filterJobs(searchFilters: string | string[]) {
    if (!searchFilters || (Array.isArray(searchFilters) && searchFilters.length === 0)) {
      this.filteredJobs = this.jobs; // Se não houver filtros, exibe todas as vagas
      return;
    }

    const filters = Array.isArray(searchFilters) ? searchFilters : [searchFilters];

    this.filteredJobs = this.jobs.filter(job => 
      filters.every(filter => 
        job.company.toLowerCase().includes(filter.toLowerCase()) ||
        job.role.toLowerCase().includes(filter.toLowerCase()) ||
        job.level.toLowerCase().includes(filter.toLowerCase()) ||
        job.languages.some(lang => lang.toLowerCase().includes(filter.toLowerCase())) ||
        job.tools.some(tool => tool.toLowerCase().includes(filter.toLowerCase()))
      )
    );
  }

  addSkillFilter(skill: string) {
    if (!this.searchFilters.includes(skill)) {
      this.searchFilters.push(skill);
    }
    this.filterJobs(this.searchFilters);
  }
  
}