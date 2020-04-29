/**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */
function pbAlaSqlCtrl($scope) {
    
    var ctrl=this;
    var vm=this;
    
    
    this.exportExcel = function()
    {
        var mystyle = {
				headers:true,
				columns: [],
		};
		
		mystyle.columns = [ 
		    { 'columnid': 'name', 'title': 'Name of the company'},
		    { 'columnid': 'adresse', 'title': 'Address'}
        ];
		    
		var dataJson = [ 
		    {"name": "Bonitasoft", "adresse":"51 rue gustave Eiffel"},
		    {"name": "Imagina international"},
		    {"name": "Cap Gemini"},
		       
		]
      console.log("widget alaSql: export filename:"+$scope.properties.fileNameExported)
       alasql('SELECT * INTO XLS(?,?) FROM ?', [$scope.properties.fileNameExported,$scope.properties.controlExport, $scope.properties.dataExport]);
    }
    
    // --------------------------------- Import
    this.init = function( )
    {
         $scope.properties.valueImported=[];
         console.log("widget-alasqlOperation: Init");
    }
    this.init();
    
    // see https://github.com/agershun/alasql/issues/971#issuecomment-360121191 to work with local file
    // http://jsfiddle.net/3ve90afo/ ==> Ouah!
    this.jsonloaded=[];
    this.errorImport ='';
    this.statusImport='';
    
   
    $scope.loadFile = function(event, element) {
	    console.log("alasqlOperation: loadFile");
        var self=ctrl;

        // it's not multiple: should have only one name here
	     var files = element.files;
	     var l = files.length;
        for (var i = 0; i < l; i++) {
            self.importFileName=files[i].name;
            $scope.properties.fileNameImported=files[i].name;
            console.log("alasqlOperation: loadFile file="+files[i].name);
        }  
        self.errorImport="";
        self.statusImport="Start loading;";
        
        $scope.properties.valueImported=[];
        $scope.properties.headerImported=[];
        $scope.properties.statusImport=self.statusImport;
        $scope.properties.errorImport=self.errorImport;



        try
        {
    	    alasql('SELECT * FROM FILE(?,{headers:true})',[event],function(data){
	    	    console.log("widget-alasqlOperation: fileNameChanged decoded");
                console.log(data);
                self.statusImport+="File detected;";
                self.updateData( angular.copy(data) );
	        });
        } catch (ex){
            self.errorImport += ex.message;
            self.statusImport += "error : "+ex.message+";";
        }
    }

  this.updateData = function ( data ) {
        // console.log(data);
        // get all the header value
         this.statusImport+="Update data;";
        var header =[];
        if (data.length>0)
        {
            var headerLine= data[ 0 ];
            this.statusImport += "Header(first line):"+angular.toJson(data[0]);
            for (var i in headerLine)
            {
                header.push( i );
                console.log("widget-alasqlOperation:Header "+i);
            }
        }
        $scope.properties.valueImported=data;
        $scope.properties.headerImported=header;
        $scope.properties.statusImport=this.statusImport;
        $scope.properties.errorImport=this.errorImport;
        console.log("widget-alasqlOperation: Header");
        console.log($scope.properties.headerImported);
        
    }
    
    this.getStatusErrorImport = function() {
        return  this.errorImport;
    }

}