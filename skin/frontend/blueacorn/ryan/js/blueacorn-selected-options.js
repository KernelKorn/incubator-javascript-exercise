Product.Config.prototype.configureElement = Product.Config.prototype.configureElement.wrap(function(parentMethod, element) {
    parentMethod(element);

    var validate = Validation.validate(element);
    var selectedIndex = element.selectedIndex;

    if (selectedIndex != element.prevIndex && validate) {
        Dialog.confirm("Are you sure you want to change your configuration?", {
            width: 300,
            okLabel: "Okay",
            buttonClass: "changeOptionButton",
            id: "changeOptionId",
            cancel: function (win) {
                element.selectedIndex = element.prevIndex;
                Product.Config.prototype.displayOptions();
            },
            ok: function (win) {
                Product.Config.prototype.displayOptions();
                return true;
            }
        });
        element.prevIndex = element.currentIndex;
        element.currentIndex = selectedIndex;
    } else {
        Product.Config.prototype.displayOptions();
    }
});

Product.Config.prototype.displayOptions = function(){
    var areAllSelected = spConfig.settings.every(function(allAtr){
        return Validation.validate(allAtr);
    });

    if ($('display-selected') != null){
        $('display-selected').remove();
    }
    if (areAllSelected) {
        var selectedOptions = '';
        spConfig.settings.each(function (index) {
            selectedOptions += index[index.selectedIndex].innerHTML + ', ';
        });

        selectedOptions = selectedOptions.replace(/,\s*$/, "");

        $$('.product-options-bottom')[0].insert({
            top: '<p id="display-selected" style="color:#3399cc">Your Selected Options: ' + selectedOptions + '</p>'
        });
    }
}
