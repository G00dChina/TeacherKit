﻿var sankoreLang = {
    view: "Zobraziť", 
    edit: "Upraviť",
    example: "naj*vý*raz*nej*ší",
    wgt_name: "Slabiky",
    reload: "Obnoviť",
    slate: "bridlica",
    pad: "tablet",
    none: "žiadny",
    help: "Pomoc",
    help_content: 
"<p><h2> Slabiky </h2></p>"+
"<p><h3> Delenie slov na slabiky</h3></p>"+
"<p>Cieľom aktivity je správne rozdeliť slovo. Ak sa to žiakom podarí, celé slovo sa zafarbí dozelena.</p>"+
"<p>Ak chcete slovo rozdeliť na slabiky alebo toto rozdelenie zrušiť, nastavte kurzor na koniec slabiky a kliknite myšou (resp. stylusom).</p>"+
"<p>Tlačidlom „Obnoviť“ vrátite cvičenie do pôvodného stavu. </p>"+
"<p>Po stlačení tlačidla „Upraviť“ môžete v&nbsp;režime úprav:</p>"+
"<ul><li> zmeniť farebný motív na tablet, bridlicu alebo na žiadny (predvolený je žiadny),</li>"+
"<li> zmeniť slovo (slovo napíšte do textového poľa a rozdeľte ho na slabiky pomocou *).</li></ul>"+
"<p>Tlačidlom „Zobraziť“ sa z režimu úprav vrátite na aktivitu.</p>",
    theme:"Farebný motív"
};

// if use the "view/edit" button or rely on the api instead
var isSankore = false;
// whether to do window.resize or not (window = widget area)
var isBrowser = ( typeof( widget ) == "undefined" );

function wcontainer( containerID )
{
    // some protecred variables
    var thisInstance = this;
    this.editMode = false;
    var data = {}; // see setData and getData
	
    // widget size parameters
    this.minHeight = 100;
    this.minWidth = 400;
	
    // links to the elements of the widget
    this.elements = {};
	
    /*
	============
	create
	============
	- creates html base, inits this.elements, assings events
	*/
    this.create = function( containerID )
    {
        var html = 
        '<div id="mp_content">' +
        '<div class="viewmode">' +
        '</div>' +
        '<div class="editmode">' +
        '</div>' +
        '</div>';
		
        var container = $( containerID );
		
        container.append( html );
        this.elements.edit = container.find( ".editmode" );
        this.elements.view = container.find( ".viewmode" );
        this.elements.container = container;
        this.elements.containerView = container.find( "#mp_content .viewmode" );
        this.elements.containerEdit = container.find( "#mp_content .editmode" );
		
        $("#wgt_edit").live("click", function(){
            thisInstance.modeEdit();
        } );
		
        $("#wgt_display").live("click", function(){
            thisInstance.modeView();
        } );
    };
	
	
    /*
	===============
	setViewContent
	===============
	- assigns custom html to the viewmode container
	*/
    this.setViewContent = function( html )
    {
        this.elements.container.find( "#mp_content .viewmode" ).html( html );
    };
	
    /*
	===============
	setEditContent
	===============
	- assigns custom html to the editmode container
	*/
    this.setEditContent = function( html )
    {
        this.elements.container.find( "#mp_content .editmode" ).html( html );
    };
	
	
	
    /*
	=========================
	modeEdit and modeView
	=========================
	- switch the widget betweed modes
	* for customization extend onEditMode and onViewMode
	*/
    this.modeEdit = function()
    {
        this.onEditMode();
        this.editMode = true;
        this.elements.edit.removeClass( "hide" );
        this.elements.view.addClass( "hide" );
		
        //this.adjustSize();
    };
    this.modeView = function()
    {
        this.onViewMode();
        this.editMode = false;
        this.elements.edit.addClass( "hide" );
        this.elements.view.removeClass( "hide" );
		
        //this.adjustSize();
    };
	

    /*
	======================
	setData and getData
	======================
	- store some data inside
	*/
    this.setData = function( name, value ){
        data[name] = value;
    };
    this.getData = function( name ){
        if( typeof( data[name] ) == "undefined" ){
            return null;
        } else return data[name];
    };
	
	
    // redefinable methods
	
    /*
	==========================
	onEditMode and onViewMode
	==========================
	- these are called when the mode is being changed
	*/
    this.onEditMode = function(){
    //
    };
    this.onViewMode = function(){
    //
    };
	
    /*
	======================
	viewSize and editSize
	======================
	- calculate container size for the adjustSize method
	* they are likely to be redefined for each particular widget
	*/
    this.viewSize = function(){
        return {
            w: this.elements.containerView.outerWidth(),
            h: this.elements.containerView.outerHeight()
        };
    };
    this.editSize = function(){
        return {
            w: this.elements.containerEdit.outerWidth(),
            h: this.elements.containerEdit.outerHeight()
        };
    };
	
    /*
	=====================
	checkAnswer
	=====================
	- check if the exercise in the view mode was done right
	* redefine it for each particular widget
	*/
    this.checkAnswer = function()
    {
    //
    };
	
	
    // constructor end
	
    // if the constructor was called with a parameter,
    // call create() automatically
    if( arguments.length > 0 ){
        this.create( containerID );
    }
    this.setData( "dw", this.elements.container.outerWidth( true ) - this.elements.container.width() );
    this.setData( "dh", this.elements.container.outerHeight( true ) - this.elements.container.height() );
    window.winstance = thisInstance;
}
