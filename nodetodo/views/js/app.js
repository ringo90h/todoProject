$(document).ready(function() {
    reloadToDo()

    function reloadToDo(sort = "") {
        var url = 'http://127.0.0.1:3000/item'
        if (sort != "") {
            url = url + "?sort=" + sort
        }
        var fadeOutDone = $("#todolist").fadeOut(500, function() {
            $("#todolist").empty()
            $("#loading").show();
        }).promise();

        fadeOutDone.then(function() {
            $("#loading").removeAttr("style").hide();
            $.ajax({
                url: url,
                type: 'get',
                success: function(data) {
                    data.forEach(element => {
                        var color;
                        var d;
                        switch (element.category) {
                            case "집안일":
                                color = "success"
                                break;
                            case "업무":
                                color = "primary"
                                break;
                            case "공부":
                                color = "secondary"
                                break;
                            case "중요":
                                color = "danger"
                                break;
                            case "약속":
                                color = "warning"
                                break;
                        }
                        if (element.dueDate.toString()[0] == "0") {
                            d = "미정"
                        } else {
                            d = element.dueDate.toString().substring(0, 10)
                        }

                        var data = `<div class="col-sm-6 col-md-4 mb-3">
                        <div class="card" style="max-width: 21rem;">
                            <div class="card-body">
                                <h5><span class="badge badge-${color} text-white">${element.category}</span></h5>
                                <p class="card-text">${element.content}</p>
                                <p class="card-text text-right">기한: ${d}</p>
        
                                <a class="delete-${element.item_id} btn btn-info text-white float-right" id="${element.item_id}">done</a>
                            </div>
                        </div>
                    </div>`
                        $("#todolist").append(data)
                    });
                    addDeleteEventListener()
                },
                error: function(error) {
                    $("#todolist").append("<h4>서버에 오류가 있습니다.</h4>")
                }
            })
        })
        $("#todolist").fadeIn("slow", function() {});
    }

    function addDeleteEventListener() {
        $("[class^=delete]").on("click", function() {
            $.ajax({
                url: `http://127.0.0.1:3000/item/${this.id}`,
                dataType: 'json',
                type: 'GET'
            }).done(function(result) {
                console.log(result)
                reloadToDo()
                addDeleteEventListener()
            })
        })
    }
    $("#postBtn").on("click", function() {
        var content = $('#content').val()
        var category = $('#category').val()
        var dueDate = $('#dueDate').val()

        if (content.length == 0) {
            return;
        }

        $.ajax({
            url: 'http://127.0.0.1:3000/item',
            dataType: 'json',
            type: 'POST',
            data: {
                content: content,
                category: category,
                dueDate: dueDate
            }
        }).done(function(result) {
            console.log(result)
            reloadToDo()
            addDeleteEventListener()
        })
    })

    $('#sort').change(function() {
        var val = $("#sort option:selected").text();
        var sort;
        switch (val) {
            case "내용":
                sort = "content"
                break;
            case "기한":
                sort = "dueDate"
                break;
            case "작성시간":
                sort = "createDate"
                break;
        }
        reloadToDo(sort)
    });
})