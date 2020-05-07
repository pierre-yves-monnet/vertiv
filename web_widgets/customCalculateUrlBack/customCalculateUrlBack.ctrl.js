/**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */
function calculateUrlBack($scope) {
   
    ctrl = this;
    ctrl.locationref="";
    ctrl.urlBack="";
	
  
   
   this.calculateUrl = function ( sourceUrl ) {
		ctrl.messageDecode="";
		
		// ------------------ application
		var filterApplication="/bonita/portal/resource/app/";
        // referer= http://localhost:61547/bonita/portal/resource/app/edf/quart/content/
        var pos=sourceUrl.indexOf( filterApplication );
        if ( pos!= -1 )
        {
            // this is an application
            // create http://localhost:61547/bonita/apps/edf/quart/
            //                                           edf/quart/
            ctrl.messageDecode +="Application:";
            pos = pos + filterApplication.length;
            var endString= sourceUrl.substring( pos );
            ctrl.messageDecode=" endString ["+endString+"]";
            // we search now 2 /
			var separator = endString.indexOf("/");
			if (separator!=-1)
				separator = endString.indexOf("/", separator+1);
			if (separator!=-1)
			{
				var applicationHome = endString.substring(0,separator);
				ctrl.messageDecode +=" ;applicationHome ["+applicationHome+"]";
				ctrl.resultDecode = "/bonita/apps/"+applicationHome;
				ctrl.messageDecode+= ";UrlBack["+ctrl.resultDecode+"]";
            }
            console.log("WidgetCalculateurlBack : "+ctrl.messageDecode);
            return;
        }
		
		// ------------------ Page
		var filterPage="/bonita/portal/custom-page/";
        // referec      http://localhost:61547/bonita/portal/custom-page/custompage_Quart/?locale=en&profile=101
		// want back to http://localhost:61547/bonita/portal/custom-page/custompage_Quart/?locale=en&profile=101

        var pos=sourceUrl.indexOf( filterPage );
        if ( pos!= -1 )
		{
			// this is an page
            // create http://localhost:61547/bonita/portal/custom-page/custompage_Quart/?locale=en&profile=101
            //  
            ctrl.messageDecode +="Page:";
            var endString= sourceUrl.substring( pos );
            ctrl.messageDecode=" endString ["+endString+"]";

			ctrl.resultDecode = endString;
			ctrl.messageDecode+= " UrlBack["+ctrl.resultDecode+"]";
            console.log("WidgetCalculateurlBack : "+ctrl.messageDecode);
			return;
		}
		// ------------------ Portal
		var filterPortal="/bonita/portal.js";
        // referec      http://localhost:61547/bonita/portal.js/
		// want back to http://localhost:61547/bonita

        var pos=sourceUrl.indexOf( filterPortal );
        if ( pos!= -1 )
		{
			// this is an Portal
            // create http://localhost:61547/bonita
            //  
            ctrl.messageDecode +="Portal:";
       	    ctrl.resultDecode =sourceUrl;		
			ctrl.messageDecode+= " UrlBack["+ctrl.resultDecode+"]";
            console.log("WidgetCalculateurlBack : "+ctrl.messageDecode);
			return;
		}
		ctrl.messageDecode +="Don't detect any pattern";
       	ctrl.resultDecode = "/bonita"		
        console.log("WidgetCalculateurlBack : "+ctrl.messageDecode);


	}
   
     ctrl.init = function() {
        ctrl.locationref = window.location.href;
        ctrl.list = document.referrer;
        console.log("======== calculateUrlBack referrer "+ctrl.list);
        ctrl.calculateUrl( document.referrer );
		$scope.properties.urlBack = ctrl.resultDecode;
		ctrl.urlBack = ctrl.resultDecode;
        console.log("======== calculateUrlBack "+ctrl.urlBack);
       
    }
    ctrl.init();
    // define a function to be used in template with ctrl.toggleBackgroundColor()
   
   
   
   ctrl.test="";
   ctrl.testValue = function() {
		ctrl.calculateUrl( ctrl.test );
	}
}