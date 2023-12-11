//Version 29
var collapse;
var single;
var id;
var idNumber;
var twoCols;
var subFolderOn;
var accId;

var centeredContainerFill = '';
var centeredItemFill  = '';
var centeredMarginFill = '';
var centeredClosingDiv = '';

var parentScript = document.currentScript;

try 
{ 
  var middleAlign = false;
  if(parentScript.hasAttribute('centered'))
  {
    middleAlign = parentScript.getAttribute('centered');
  }
  else
  {
    middleAlign = centered;
  }

  if(middleAlign)
  {
    centeredContainerFill = "centered-flex-container";
    centeredItemFill  = '<div class="centered-flex-item">';
    centeredMarginFill = '<div class="centered-flex-margin"></div>';
    centeredClosingDiv = '</div>';
  }
}
catch(e){}


try 
{ 
  if(parentScript.hasAttribute('uncollapsedPDF'))
  {
    single = parentScript.getAttribute('uncollapsedPDF');
  }
  else
  {
    single = uncollapsedPDF;
  }
}
catch(e){ single = false;}

try {
  if(parentScript.hasAttribute('twoColumn'))
  {
    twoCols = parentScript.getAttribute('twoColumn');
  }
  else
  {
    twoCols = twoColumn;
  }
}
catch(e){ twoCols = false;}

try { 
  if(parentScript.hasAttribute('subFolders'))
  {
    subFolderOn = parentScript.getAttribute('subFolders');
  }
  else
  {
    subFolderOn = subFolders; 
  }
}
catch(e){ subFolderOn = false;}


try {
  collapse = parentScript.getAttribute('data-idNumber')

  if(collapse != null)
  {
    id = "dropDownBlock_" + collapse;
  }
  else
  {
    id = "dropDownBlock";
    collapse = 0;
  }
}
catch(e)
{
  collapse = 0;
  id = "dropDownBlock";
}
accId = collapse;
collapse = collapse * 10; //Makes it less likely for collapse ids to be shared

var text = document.getElementById(id).textContent;
var objectStart = text.indexOf("var items = [");
var objectEnd = text.indexOf("];") ;
var object = text.substring(objectStart+12, objectEnd+2);
eval('var itemLibrary =' + object); //creates the item Library Variable


var html = '' ;
var targetTab;


//Main
try
{
  if(subFolderOn)
  { 
    html += generateSubFolder();
  }
  else if(twoCols)
  {
    generateTwoColumn();
  }
  else
  {
    html += '<div class="'+centeredContainerFill+' panel-group" id="accordion'+accId+'">'+centeredMarginFill+centeredItemFill;
    for(var i = 0; i<itemLibrary.length; i++)
    {
      html += generateDropDown(itemLibrary[i],accId);
    }
    html += centeredClosingDiv +centeredMarginFill+ '</div>';
  }
}
catch(e)
{
  errorCatchFallback(e);
}


document.getElementById(id).innerHTML = html;
document.getElementById(id).style.display = "inherit";


function loadIframe(frameID) 
{
  var frame = document.getElementById(frameID); 
  frame.src = frame.dataset.src; 
} 

function generateDropDown(item, id = 'Outer', classVar = ""){
  var htmlSingle = "";
  var fileType = item.type.toLowerCase();
  item.link = item.link.trim();
  if( fileType == "pdf")
  {
    if(screen.width < 500 && !single)
    {
      htmlSingle += '<div class="panel panel-default"><div class="panel-heading collapsed" data-parent="#accordion'+id+'' +
      '" data-toggle="collapse" data-target="#scriptIn' + collapse + '" onclick="loadIframe(&apos;frame' + collapse + '&apos;)"><h4 class="panel-title">' +
          '<a data-parent="#accordion'+id+'" class="collapsible-item-title-link-icon pull-right" data-toggle="collapse"' +
          'href="#scriptIn' + collapse + '" role="button"><img class="dropDownArrow" alt="Download" src="./img/dropDownArrow.svg"></a><a data-parent="#accordion'+id+'' +
          '" data-toggle="collapse" href="#scriptIn' + collapse + '" class="dropDown">' + item.displayName + '</a><a href="' + item.link + '" download>' +
          '<img class="content-download" alt="Download" src="./img/downloadIcon.png" style="height:19px; margin:0px 0px 2px 5px; width:15px;" />' +
          '</a></h4></div><div class="collapse '+classVar+' panel-collapse" id="scriptIn' + collapse + '"> <div class="panel-body"><div' +
          '><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 120%;">' +
          '<iframe id="frame' + collapse + '" allowfullscreen="" data-src="https://docs.google.com/viewer?url=' + item.link + '&embedded=true" style="border: 0; top: 0; left: 0; width: 100%;' +
          'height: 100%; position: absolute;" tabindex="-1"></iframe></div></div></div></div></div>';
    }
    else if(screen.width >= 500 && !single)
    {
      htmlSingle += '<div class="panel panel-default"><div class="panel-heading collapsed"data-parent="#accordion'+id+'' +
      '" data-toggle="collapse" data-target="#scriptIn' + collapse + '" onclick="loadIframe(&apos;frame' + collapse + '&apos;)"><h4 class="panel-title">' +
          '<a data-parent="#accordion'+id+'" class="collapsible-item-title-link-icon pull-right" data-toggle="collapse"' +
          'href="#scriptIn' + collapse + '" role="button"><img class="dropDownArrow" alt="Download" src="./img/dropDownArrow.svg"></a><a data-parent="#accordion'+id+'' +
          '" data-toggle="collapse" href="#scriptIn' + collapse + '" class="dropDown">' + item.displayName + '</a><a href="' + item.link + '" target="_blank" download>' +
          '<img class="content-download" alt="Download" src="./img/downloadIcon.png" style="height:19px; margin:0px 0px 2px 5px; width:15px;" />' +
          '</a></h4></div><div class="collapse '+classVar+' panel-collapse" id="scriptIn' + collapse + '"> <div class="panel-body"><div>' +
          '<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 120%;"><iframe id="frame' + collapse + '" allowfullscreen="" data-src="' + item.link +
          '"style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" tabindex="-1"></iframe></div></div></div></div></div>';
    }
    else if(screen.width < 500 && single)
    {
      htmlSingle += '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title">' +
          '<a class="dropDown">' + item.displayName + '</a><a href="' + item.link + '" download>' +
          '<img class="content-download" alt="Download" src="./img/downloadIcon.png" style="height:19px; margin:0px 0px 2px 5px; width:15px;" />' +
          '</a></h4></div><div class="collapse panel-collapse in"> <div class="panel-body"><div' +
          '><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 120%;">' +
          '<iframe allowfullscreen="" src="https://docs.google.com/viewer?url=' + item.link + '&embedded=true" style="border: 0; top: 0; left: 0; width: 100%;' +
          'height: 100%; position: absolute;" tabindex="-1"></iframe></div></div></div></div></div>';
    }
    else
    {
      htmlSingle += '<div class="panel panel-default"> <div class="panel-body">' +
      '<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 120%;"><iframe allowfullscreen="" src="' + item.link +
          '"style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" tabindex="-1"></iframe></div></div></div>';
    }
    collapse++;
  }   
  else if(fileType == "link" || fileType == "links")
  {
    targetTab = '_blank'; //Resets the default tab target for pages to open in a new tab

    if((item.link.indexOf('isd391.org') != -1 || item.link.indexOf('clevelandmn.sites') != -1 || item.link.indexOf('.') == -1) && item.link.indexOf('google.com') == -1) //Sets the tab target to open in the same tab if link is local
    {
        targetTab = '_self'; 
    }

    //Creates the html code for a link
    htmlSingle += '<div class="panel panel-default"><div class="panel-heading" onclick=window.open("' + 
    item.link + '","' + targetTab + '")><h4 class="panel-title"><a onclick="event.stopPropagation()" href="' + 
            item.link + '" role="button" target="' + targetTab + '"><span class="glyphicon glyphicon-new-window"></span>' + item.displayName + '</a></h4> </div> </div>';
  }
  else if(fileType == "email" || fileType == "mail")
  {
    htmlSingle += '<div class="panel panel-default"><div class="panel-heading" onclick=window.open("mailto:' + 
    item.link + '","_self")><h4 class="panel-title"><a href="mailto:' + 
            item.link + '" role="button"><span class="pull-right glyphicon glyphicon-envelope"></span>' + item.displayName + '</a></h4> </div> </div>';
  }

  return htmlSingle;
}


function errorCatchFallback(e)
{

  html = "";
  html += '<div class="panel-group" id="accordionOuter">' ;

  for(var i = 0; i<itemLibrary.length; i++)
  {
    html += generateDropDown(itemLibrary[i]);
  }
  html += '</div>' ;

}


function generateTwoColumn()
{
  html += '<div class="drop-flex-container panel-group" id="accordionTwoColumn">';
    
    var halfLibLngInt = parseInt(itemLibrary.length/2);
    var halfLibLng = itemLibrary.length/2;
    if(halfLibLng != halfLibLngInt)
    {
      halfLibLng = halfLibLngInt + 1;
    }

    html += '<div class="drop-flex-item">';

    for(var i = 0; i<halfLibLng; i++)
    {
      html += generateDropDown(itemLibrary[i],'TwoColumn');
    }

    html += '</div><div class="drop-flex-item">';

    for(var i = halfLibLng; i < itemLibrary.length; i++)
    {
      html += generateDropDown(itemLibrary[i],'TwoColumn');
    }

    html += '</div>';
}


function generateSubFolder()
{
  class Folders 
  {

    constructor()
    {
      this.folders = [];
    }

    indexOf(folderName)
    {
      for(var i = 0; i<this.folders.length; i++)
      {
        if(folderName == this.folders[i].name)
        {
          return i;
        }
      }
      return -1;
    }
    
    addItem(folderName, item)
    {
      if(this.indexOf(folderName) == -1)
      {
        this.folders.push({name:folderName, queue:[]});
      }
      var index = this.indexOf(folderName);
      this.folders[index].queue.push(item);
    }

    getItem(folderName)
    {
      var index = this.indexOf(folderName);
      if(index == -1)
      {
        throw "Folder Doesn't Exist";
      }
      else if (this.folders[index].queue.length == 0)
      {
        throw "Folder is Empty";
      } 
      return this.folders[index].queue.shift();
    }

    itemCount(folderName)
    {
      var index = this.indexOf(folderName);
      if(index == -1)
      {
        throw "Folder Doesn't Exist";
      }
      return this.folders[index].queue.length;
    }

    folderCount()
    {
      return this.folders.length;
    }

    getName(index)
    {
      if(index < 0 || index > this.folders.length)
      {
        throw "Index out of bounds";
      }
      return this.folders[index].name;
    }
  }


  var subFoldHtml;
  var dropDownArray = [];

  let folderLibrary = new Folders(); 

  var name;
  for(var i = 0; i<itemLibrary.length; i++) //Sorts files by folder
  {
    try
    {
      name = itemLibrary[i].folderName;

      if(name == undefined)
      {
        name = "";
      }
    }
    catch(e)
    {
      name = "";
    }

    try
    {
      folderLibrary.addItem(name, itemLibrary[i])
    }
    catch(e)
    {
      errorCatchFallback(e);
    }
  }
  
  var folderName;
  var notMain;
  var itemCount;
  try
  {
    if(folderLibrary.folderCount() == 0)
    {
      throw "No folders Were added";
    }
    for(var i = 0; i < folderLibrary.folderCount(); i++)
    {
      subFoldHtml = "";

      folderName = folderLibrary.getName(i);
      itemCount = folderLibrary.itemCount(folderName);

      if((folderName != "" && folderName.toLowerCase() != "main"))
      {
        subFoldHtml += '<div class="panel panel-default panel-folder"><div class="panel-heading collapsed" data-toggle="collapse" data-parent="#accordionOuter"'+
        ' href="#collapseFolder' + collapse + '" ><h4 class="panel-title">' +
              '<a class="collapsible-item-title-link-icon pull-right" data-toggle="collapse" data-parent="#accordionOuter"'+
              ' href="#collapseFolder' + collapse + '" role="button"><img class="dropDownArrow" alt="Download" src="./img/dropDownArrow.svg"></a>' +
              '<a data-parent="#accordionOuter" data-toggle="collapse" href="#collapseFolder' + collapse + '" class="dropDown">' +
              folderName + '</a></h4></div><div class="collapse collapse-folderLevel panel-collapse" id="collapseFolder' + collapse + '">' +
              '<div class="panel-body"><div class="panel-group" id="accordionInner'+ collapse+'">';
        collapse++;

        for(var j = 0; j < itemCount; j++)
        {
          subFoldHtml += generateDropDown(folderLibrary.getItem(folderName), 'Inner'+collapse, 'collapse-item');
        }
        subFoldHtml += '</div></div></div></div>';
        dropDownArray.push(subFoldHtml);
      }
      else
      {

        for(var j = 0; j < itemCount; j++)
        {
          dropDownArray.push( generateDropDown(folderLibrary.getItem(folderName),'Outer','collapse-folderLevel'));
        }
      }
    }
  }
  catch(e)
  {
    errorCatchFallback(e);
  }

  try
  {
    var returnHtml = "";
    if(twoCols)
    {
      returnHtml += '<div class="drop-flex-container panel-group" id="accordionOuter">';
      
      var halfLngthInt = parseInt(dropDownArray.length/2);
      var halfLngth = dropDownArray.length/2;
      var lngth = dropDownArray.length;
      if(halfLngth != halfLngthInt)
      {
        halfLngth = halfLngthInt + 1;
      }

      returnHtml += '<div class="drop-flex-item">';
      for(var i = 0; i<halfLngth; i++)
      {
        returnHtml += dropDownArray.shift();
      }


      returnHtml += '</div><div class="drop-flex-item">';

      for(var i = halfLngth; i < lngth; i++)
      {
        returnHtml += dropDownArray.shift();
      }

      returnHtml += '</div>';
    }
    else
    {
      returnHtml += '<div class="'+centeredContainerFill+'panel-group" id="accordionOuter">'+centeredMarginFill+centeredItemFill;
      while(dropDownArray.length > 0)
      {
        returnHtml += dropDownArray.shift();
      }
      returnHtml += centeredClosingDiv+centeredMarginFill+'</div>';
    }
  }
  catch(e)
  {
    errorCatchFallback(e);
  }

  return returnHtml;
}


$(document).ready(function() {

    $(".collapse-item").on('show.bs.collapse', function (event) {
        try{$('.collapse-item').collapse('hide');}catch(e){};
        event.stopPropagation();
    })

    $(".collapse-folderLevel").on('show.bs.collapse', function () {
        try{$('.collapse').collapse('hide');}catch(e){};
    })

    $('#accordionTwoColumn').on('show.bs.collapse', function () {
        try{$('#accordionTwoColumn .in').collapse('hide');}catch(e){};
    });

    $('.collapse').on('shown.bs.collapse', function(event){
            $(this).siblings(".panel-heading").find(".glyphicon-chevron-down:first").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
            event.stopPropagation();
        }).on('hidden.bs.collapse', function(event){
            $(this).siblings(".panel-heading").find(".glyphicon-chevron-up:first").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
            event.stopPropagation();
    });
});

   
$('.playableDiv').on('hidden.bs.collapse', function () { $(this).find('audio').trigger('pause'); $(this).removeClass('playing');});


 