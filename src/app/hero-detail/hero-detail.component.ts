import {Component, Input, OnInit} from '@angular/core';
import {HeroService} from '../hero.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Hero} from '../hero';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
@Input() hero: Hero;
  constructor(private heroService: HeroService,
              private location: Location,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.getHero();
  }
  getHero() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

}
