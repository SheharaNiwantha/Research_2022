function save_driver(){
  let full_name=$('#full_name').val();
  let con=$('#con').val();
  let nic=$('#nic').val();
  let Username=$('#nic').val();
  let password=$('#password').val();

  let id="save_driver";
  if (con==""|| nic==""|| Username==""|| password==""){
    Swal.fire(
      'Error!',
      'Please enter details !',
      'error'
    );
  }else{
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to save this Driver ?",
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
          data:{id:id,full_name:full_name,con:con,nic:nic,Username:Username,password:password},
          success: function (data) {
            window.location.reload();
          }
        });
      }
    })
  }
}


function set_Driver(cus_id){
  $('#c_id').val(cus_id);
}

function update_password(){
  let password=$('#password_1').val();
  let c_id=$('#c_id').val();
  let id="change_password";
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to change password ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Change !'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: '../Model/Post.php',
        data:{id:id,password:password,c_id:c_id},
        success: function (data) {
          window.location.reload();
        }
      });
    }
  })
}

function delete_driver(driver_id){
  let id="delete_driver";
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want to delete driver ?",
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
        data:{id:id,driver_id:driver_id},
        success: function (data) {
          window.location.reload();
        }
      });
    }
  })
}
