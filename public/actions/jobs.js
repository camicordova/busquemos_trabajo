$(document).ready( function () {
    $('#tablausuario').DataTable({
      'order':[[1,'asc']],
      'columnDefs':[{type:"html",target:4}],
      "bAutoWidth": false
    });
} );