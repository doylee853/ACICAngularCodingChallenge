import { Component } from '@angular/core';
import { InMemoryDataService } from './in-memory-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Agency Authority - Insurance Coverages Allowed to be Rated';
  best = InMemoryDataService.findFirstAndSecondMostUsedLine(InMemoryDataService.createDb().linesOfBusiness, InMemoryDataService.createDb().recentQuotes).retVal;
  secondBest = InMemoryDataService.findFirstAndSecondMostUsedLine(InMemoryDataService.createDb().linesOfBusiness, InMemoryDataService.createDb().recentQuotes).secondRetVal;
}

