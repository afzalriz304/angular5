export class Affiliation {
    city: string;
    dateEnd:string;
    dateStarted:string;
    depCode:number;
    depName:string;
    designation:string;
    hosId:string;
    hosName:string;
    hospitalIcon:string

    constructor(city:string,dateEnd:string,dateStarted:string,depCode:number,depName:string,
    	designation:string,hosId:string,hosName:string,hospitalIcon:string){

    	this.city		=	city;
    	this.dateEnd	=	dateEnd;
    	this.dateStarted=	dateStarted;
    	this.depCode	=	depCode;
    	this.depName	=	depName;
    	this.designation=	designation;
    	this.hosId		=	hosId;
    	this.hosName	=	hosName;
    	this.hospitalIcon=	hospitalIcon;

    }

}