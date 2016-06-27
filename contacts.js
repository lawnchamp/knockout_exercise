var initialData = [
  { first: "Riley", last: "Shenk", phone: "(678) 345-1234" },
  { first: "John", last: "Smith", phone: "(234) 534-3456" },
  { first: "Bob", last: "Hoover", phone: "(123) 123-1234" },
];
 
var PagedGridModel = function(contacts) {
  this.contacts = ko.observableArray(contacts);
  this.firstName = ko.observable("");
  this.lastName = ko.observable("");
  this.phoneNumber = ko.observable("");
 
  this.addItem = function() {
    if (this.firstName() != "" || this.lastName() != "") {
      this.contacts.push({ first: this.firstName(), last: this.lastName(), phone: this.phoneNumber() });
      this.firstName("");
      this.lastName("");
      this.phoneNumber("");
    }
  }.bind(this);
 
  this.sortByFirst = function() {
    this.contacts.sort(function(a, b) {
      return a.first < b.first ? -1 : 1;
    });
  };

  this.sortByLast = function() {
    this.contacts.sort(function(a, b) {
      return a.last < b.last ? -1 : 1;
    });
  };

  self.removeContact = function(contact) {
    this.contacts.remove(contact);
  }.bind(this);

  self.validPhone = function(phoneNumber) {
    return /^\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/.test(phoneNumber)
  };

  this.gridViewModel = new ko.simpleGrid.viewModel({
    data: this.contacts,
    columns: [
      { headerText: "First Name", rowText: "first" },
      { headerText: "Last Name", rowText: "last" },
      { headerText: "Phone Number", rowText: function (item) { return "$" + item.phoneNumber.toString() } }
    ],
    pageSize: 30
  });
};
 
ko.applyBindings(new PagedGridModel(initialData));