function getDetails() {  
    $.ajax({  
        type: "GET",  
        contentType: "application/json; charset=utf-8",  
        url: "http://localhost:3030/getAllNote", //Default.aspx is page and GetData is the WebMethod  
        data: {},  
        dataType: "json",  
        success: function(data) {  
            $('#dataTables-example tbody').remove(); // Every time I am removing the body of Table and applying loop to display data  
            console.log(data,"DATA OF AJAAX");    
            for (var i = 0; i < data.d.length; i++) {  
                $("#dataTables-example").append(  
                    "<tr><td>" + data.d[i].FName + "</td><td>" + data.d[i].Email + "</td>" +  
                    "<td>" + data.d[i].HomeMobile + "</td>" + "<td>" + data.d[i].OfficeMobile + "</td>" +  
                    "<td>" + data.d[i].Doj + "</td>" + "<td>" + data.d[i].Dob + "</td>" +  
                    "<td>" + "<input type='button' class='btn btn-primary editButton' data-id='" + data.d[i].EmpId + "' data-toggle='modal' data-target='#myModal' name='submitButton' id='btnEdit' value='Edit' />" + "</td>" +  
                    "<td><input type='button' class='btn btn-primary' name='submitButton' id='btnDelete' value='Delete'/> </td></tr>");  
            }  
        },  
        error: function() {  
            alert("Error while Showing update data");  
        }  
    });  
}