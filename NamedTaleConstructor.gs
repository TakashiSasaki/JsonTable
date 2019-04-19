function NamedTableConstructor(values, iKeyColumn, iFieldRow){
  if(!(this instanceof NamedTableConstructor)) throw "missing new operator";
  if(values === undefined){
    this.values = [[null]];
    this.iKeyColumn = 0;
    this.iFieldRow = 0;
  } else {
    this.values = values;
    this.iKeyColumn = iKeyColumn;
    this.iFieldRow = iFieldRow;
  }//if
  
  this.keys = {};
  for(var i=this.iFieldRow+1; i<this.values.length; ++i){
    var row = this.values[i];
    var key = row[this.iKeyColumn];
    if(typeof key !== "string") throw "non-string key";
    if(key === "") throw ("empty key");
    if(this.keys[key] !== undefined) throw "duplicate keys";
    this.keys[key] = i;
  }//for i
  
  this.fields = {};
  for(var i=this.iKeyColumn+1; i<this.values[this.iFieldRow].length; ++i){
    var field = this.values[this.iFieldRow][i];
    if(typeof field !== "string") throw "non-string field";
    if(field === "") throw ("empty field");
    if(this.fields[field] !== undefined) throw "duplicate field";
    this.fields[field] = i;
  }//for i
  return this;
}//NamedTableConstructor

NamedTableConstructor.prototype.set = function(key,field,value){
  var iRow = this.keys[key];
  if(iRow === undefined) throw "key does not exist";
  var iColumn = this.fields[field];
  if(iColumn === undefined) throw "field does not exist";
  //if(typeof value === "string" && value.length>0 && value.charAt(0)==="'"){
  //  value = "'" + value;
  //}
  this.values[iRow][iColumn] = value;
};

NamedTableConstructor.prototype.get = function(key,field){
  var iRow = this.keys[key];
  if(iRow === undefined) throw "key does not exist";
  var iColumn = this.fields[field];
  if(iColumn === undefined) throw "field does not exist";
  var v = this.values[iRow][iColumn];
  return this.values[iRow][iColumn];
};

NamedTableConstructor.prototype.getValues = function(){
  return this.values;
};
