$('#verborgen_file').hide();
$('#uploadButton').on('click', function () {
    $('#verborgen_file').click();
});

$('#verborgen_file').change(function () {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        $(document.body).css('background-image', 'url("' + reader.result + '")');
        icPatronChat.init({
            serverHost: 'https://home-c32.nice-incontact.com',
            bus_no: 4596619,
            poc: '9bcf4734-6076-4c6f-ae75-7bbb808ac03f',
            params: ['FirstName', 'Last Name', 'first.last@company.com', 555 - 555 - 5555]
        });
        $('.card-body').hide();
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {}
});
