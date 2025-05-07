
import Page from "./page";

class HomePage extends Page{
 
    public get logo () {
         return $('//div[@class="gPDR-main-logo"]');
    }

    public get loginButton () {
         return $('//div[@class="J-sA"]');
    }
     
     public get flightDestinationInput() {
          return $('//input[@aria-label="Flight destination input"]')
     }

     //1 June, 2025
     public departureDate(dDate: string) {
          return $(`//div[@aria-label='${dDate}']`);
     }

     public returnDate(rDate: string) {
          return $(`//div[@aria-label='${rDate}']`);
     }

     public get searchButton() {
          return $('//button[@aria-label="Search"]');
     }

     public get firstDestinationOption() {
          return $('//ul[@id="flight-destination-smarty-input-list"]/li');
     }

     

}




export default new HomePage();