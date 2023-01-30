$(function() {
  load_prediction();
});

function load_prediction(){
  $('#prediction').text("1720.7 KG");
  var settings = {
    "url": "http://192.168.10.238:5000/forecasting",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Cookie": "connect.sid=s%3ATG9MOUTpGFtjNAA2-REAIbNdJ-0fBMiA.bo2LYw6KvWyoC4%2FAWdupOgsysHrcAgXvylUHMEWlSl0"
    },
  };

  $.ajax(settings).done(function (response) {
    $('#prediction').text(response+" KG");
  });
}

function save_bin(){
  let bin_name=$('#bin_name').val();
  let location=$('#location').val();
  let bin_type=$('#bin_type').val();
  let max_load=$('#max_load').val();
  let address=$('#address').val();

  let id="save_bin";
  if (bin_name==""|| location==""|| bin_type==""|| max_load==""|| address==""){
    Swal.fire(
      'Error!',
      'Please enter details !',
      'error'
    );
  }else{
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to save this Bin ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save !'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "POST",
          url: '../Model/Post.php',
          data:{id:id,bin_name:bin_name,location:location,bin_type:bin_type,max_load:max_load,address:address},
          success: function (data) {
            window.location.reload();
          }
        });
      }
    })
  }
}



function delete_bin(bin_id){
  let id="delete_bin";
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to delete bin ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Delete !'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: '../Model/Post.php',
        data:{id:id,bin_id:bin_id},
        success: function (data) {
          window.location.reload();
        }
      });
    }
  })
}
