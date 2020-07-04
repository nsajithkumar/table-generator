$("#tableGen").delegate(".contentEdit", "dblclick", (event) => {
    var id = event.target.id;
    document.getElementById(id).setAttribute("contentEditable", "true");
    document.getElementById(id).focus();
});

$("#tableGen").delegate(".contentEdit", "focusout", (event) => {
    var id = event.target.id;
    document.getElementById(id).removeAttribute("contentEditable");
    var value = document.getElementById(id).innerText;

    $.ajax({
        url: "php/updateTable.php",
        type: "post",
        data: {row: id[0], column: id[1], value: value},
        dataType: "json",
        error: (err) => {
            alert("Problem Occured! Please Try Again Later");
        }
    }).done((res) => {
        if(res.status === 500) {
            alert("Problem Occured! Please Try Again Later");
        }
    });
});

const tableExists = () => {
    $.ajax({
        url: "php/isTableExists.php",
        type: "post",
        dataType: "json",
        error: (err) => {
            alert("Problem Occured! Please Try Again Later");
        }
    }).done((res) => {
        if(res.status === 200) {
            document.getElementById("sub").style.display = "none";
            res.rows.forEach((row, index) => {
                document.getElementById("tableHeading").style.display = "";
                $("#tableGen").append("<tr>");
                    var td = "";
                    row.splice(1).forEach((value, i) => {
                        let id = (index+1)+""+(i+1);
                        td += `<td id="${id}">
                                    <span class="p-2 contentEdit" id="${id+"value"}">${value}</span><br>
                                    <button type="button" class="btn btn-sm btn-link p-2 m-0" data-toggle="modal" data-target="#exampleModal" data-whatever="${id}">Click</button>
                               </td>`;
                    });
                    $("#tableGen").append(td);       
                $("#tableGen").append("</tr>");
            });
        } else if(res.status === 500) {
            alert("Problem Occured! Please Try Again Later");
        }
    });
}

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var rowColumn = button.data('whatever');
    var modal = $(this)
    modal.find('#rowColumnValue').val(rowColumn);
});

tableExists();

document.getElementById("getSizeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    
    let rows = document.getElementById("rows");
    let columns = document.getElementById("columns");

    $.ajax({
        url: "php/createTable.php",
        type: "post",
        data: {rows: rows.value, columns: columns.value},
        dataType: "json",
        error: (err) => {
            document.getElementById("sizeResp").innerText = "Problem Occured! Please Try Again Later";
        }
    }).done((res) => {
        if(res.status === 200) {
            rows.value = "";
            columns.value = "";
            tableExists();
        } else {
            document.getElementById("sizeResp").innerText = "Problem Occured! Please Try Again Later";
        }
    });
});

document.getElementById("mobileNumber").addEventListener("input", () => {
    var number = document.getElementById("mobileNumber").value;

    if(number.length === 10) {
        document.getElementById("modalSubmit").removeAttribute("disabled");
        document.getElementById("modalResp").innerText = "";
    } else {
        document.getElementById("modalSubmit").setAttribute("disabled", true);
        document.getElementById("modalResp").innerText = "Invalid Mobile Number";
    }
});

document.getElementById("insertInfoForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let id = document.getElementById("rowColumnValue").value;
    let name = document.getElementById("name").value;
    let mobileNumber = document.getElementById("mobileNumber").value;
    let city = document.getElementById("city").value;

    $.ajax({
        url: "php/insertDetails.php",
        type: "post",
        data: {id: id, name: name, mobileNumber: mobileNumber, city: city},
        dataType: "json",
        error: (err) => {
            document.getElementById("modalResp").innerText = "Problem Occured! Please Try Again Later";
        }
    }).done((res) => {
        if(res.status === 200) {
            document.getElementById("modalResp").innerText = "Inserted Successfully";
            document.getElementById("modalReset").click();
            setTimeout(() => {
                document.getElementById("modalClose").click();
                document.getElementById("modalResp").innerText = "";
            }, 1000);
        } else if(res.status === 500) {
            if(!res.error.includes("Duplication")) {
                document.getElementById("modalResp").innerText = "Already Inserted";
                document.getElementById("modalReset").click();
                setTimeout(() => {
                    document.getElementById("modalClose").click();
                    document.getElementById("modalResp").innerText = "";
                }, 1000);
            } else {
                document.getElementById("modalResp").innerText = "Problem Occured! Please Try Again Later";
            }
        }
    });

});