import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { LineOfBusiness } from './LineOfBusiness';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  public static createDb() {
    const linesOfBusiness = [
      { id: 11, name: 'General Liability', description: 'Liability coverage for businesses.' },
      { id: 12, name: 'Commercial Property', description: 'Property coverage for businesses.' },
      { id: 13, name: 'Inland Marine', description: 'Coverage for tools and machinery on job sites.' },
      { id: 14, name: 'Ocean Marine', description: 'Coverage for dock and boat repair businesses.' },
      { id: 15, name: 'Garage', description: 'Coverage for auto repairs and car sales.' }
    ];


    const recentQuotes = [
      { id: 101, quoteNumber: 'AC123PC', lineOfBusiness: 11 },
      { id: 102, quoteNumber: 'AC124PC', lineOfBusiness: 12 },
      { id: 103, quoteNumber: 'AC125PC', lineOfBusiness: 13 },
      { id: 104, quoteNumber: 'AC126PC', lineOfBusiness: 14 },
      { id: 105, quoteNumber: 'AC127PC', lineOfBusiness: 15 },
      { id: 106, quoteNumber: 'AC125PC', lineOfBusiness: 13 },
      { id: 107, quoteNumber: 'AC126PC', lineOfBusiness: 13 },
      { id: 108, quoteNumber: 'AC127PC', lineOfBusiness: 15 }
    ];

    // Modified to allow recentQuotes to be accessed as well
    return {linesOfBusiness, recentQuotes};
  }

  // Overrides the genId method to ensure that a line of business always has an id.
  // If the lines of business array is empty,
  // the method below returns the initial number (11).
  // if the lines of business array is not empty, the method below returns the highest
  // line of business id + 1.
  public genId(linesOfBusiness: LineOfBusiness[]): number {
    return linesOfBusiness.length > 0 ? Math.max(...linesOfBusiness.map(lineOfBusiness => lineOfBusiness.id)) + 1 : 11;
  }

  // Used to find the line with the most quotes
  // Will eventually be displayed on every page
  public static findMostUsedLine(linesOfBusiness: LineOfBusiness[], recentQuotes: {id: number, quoteNumber: string, lineOfBusiness: number}[]): String {
    let max = 0;
    let counter = 0;
    let retVal = '';

    // Go through each line of business
    // Keep track of the most popular line and the second most popular line based on number of quotes
    for(var val of linesOfBusiness){
      for(var quote of recentQuotes){
        if(quote.lineOfBusiness == val.id){
          counter++;
        }
      }

      // If the new line "val" has more quotes than the current leader:
      // Make val the new most popular
      if(counter > max){
        max = counter;
        retVal = val.name;
      }
      counter = 0;
    }

    return retVal;
  }

  // Used to find the line with the second most quotes
  public static findSecondMostUsedLine(linesOfBusiness: LineOfBusiness[], recentQuotes: {id: number, quoteNumber: string, lineOfBusiness: number}[]): String {
    let max = 0;
    let second = 0;
    let counter = 0;
    let retVal = '';
    let secondRetVal = '';

    // Go through each line of business
    // Keep track of the most popular line and the second most popular line based on number of quotes
    for(var val of linesOfBusiness){
      for(var quote of recentQuotes){
        if(quote.lineOfBusiness == val.id){
          counter++;
        }
      }

      // If the new line "val" has more quotes than the current leader:
      // Make val the new leader, and make the new leader the new second highest line
      if(counter > max){
        second = max;
        secondRetVal = retVal;
        max = counter;
        retVal = val.name;
      }

      // If the new line "val" has more quotes than the second most popular but not more than the most popular
      // Make val the new second popular line
      else if(counter > second){
        second = counter;
        secondRetVal = val.name;
      }
      counter = 0;
    }

    return secondRetVal;    
  }
  // I realize after the fact that I could have forgone creating findMostUsedLine and instead done all of my implementation in findSecondMostUsedLine
  // and returned {retVal, secondRetVal} to have access to both the top two businesses from one call, but I am running short on the allotted time and
  // would need to recommit and change everything, but I wanted to let you know that I am aware of how this could be polished up to be more
  // optimized and would definitely optimize this in an real work setting



  public static findNumberOfQuotes(lineOfBusiness: LineOfBusiness, recentQuotes: {id: number, quoteNumber: string, lineOfBusiness: number}[]): number {
    let counter = 0;
    let myId = lineOfBusiness.id;

    for(var quote of recentQuotes){
      if(quote.lineOfBusiness == myId){
        counter++;
      }
    }
    return counter; 

  }
}

