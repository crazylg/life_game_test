//global variables-------------------------------------------------------------------------------------------------------------------------------------------------
//map's size
var column = 100;
var row = 100;

//size of a cell
var cell_width = 8;
var cell_height = 8;

//map
var map = new Array();

//start percent of cell
var start_percent_of_cell = 0.5;

//refresh_time
var refresh_time = 300;

//get variables
function init_map(){
    for (var i = 0; i < row; i++) {
        map[i] = new Array(column);
        for (var j = 0; j < column; j++)
            map[i][j] = 0;
    }
};

var flag = false;
function get_variables() {
    flag = true;
    start_percent_of_cell = $('#start_percent_of_cell').val();
    refresh_time = $('#refresh_time').val();
    row = $('#row').val();
    if (start_percent_of_cell < 0 || start_percent_of_cell > 1 || refresh_time <= 0 || row < 0){
        alert("参数设置有误！！");
        $('#start_percent_of_cell').val("0.5");
        $('#refresh_time').val("300");
        $('#row').val("100");
    }
    else{
    column = row;
    init_map();
    draw_map_original();}
};

//start button-----------------------------------------------------------------------------------------------------------------------------------------
function start() {
    if (!flag) {
        init_map();
    }
    $('#btn_start').addClass('disabled');
    $('#btn_variables').addClass('disabled');
    start_percent_of_cell = $('#start_percent_of_cell').val();
    refresh_time = $('#refresh_time').val();
    randomData(map, start_percent_of_cell);
    draw_map_calculated(map);
    setInterval("refresh()", refresh_time);
};

/*click the cell*/
function set_wall(x, y) {
    if (map[x][y] == -1) {
        map[x][y] = 0;
        return false;
    }
    else {
        map[x][y] = -1;
        return true;
    }
};
function bind_click() {
    var cmap = $('#map');
    var context = cmap[0].getContext("2d");
    cmap.click(function (ev) {
        //get column and row

        var x = ev.offsetX;
        var y = ev.offsetY;

        var i = parseInt(x / cell_height);
        var j = parseInt(y / cell_width);
        if (!set_wall(i, j)) {
            context.fillStyle = "silver";//silver
            context.fillRect(i * cell_height + 1, j * cell_width + 1, cell_height - 1, cell_width - 1);
        }
        else {
            context.fillStyle = "red";//silver
            context.fillRect(i * cell_height + 1, j * cell_width + 1, cell_height - 1, cell_width - 1);
        }
    });
};


//refresh------------------------------------------------------------------------------------------------------------------------------------------------------------
function refresh() {
    updataMatrix(map);
    draw_map_calculated(map);
};

//calculating function------------------------------------------------------------------------------------------------------------------------------------------------
function randomData(map, pblt) {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < column; j++) {
            if (map[i][j] == 0) {
                if (Math.random() < pblt) {
                    map[i][j] = 1;
                }
            }
        }
    }
};

function getRoot(m, x, y) {
    if ((x <= -1) || (x >= column)) {
        return 0;
    }
    if ((y <= -1) || (y >= row)) {
        return 0;
    }
    if (m[x][y] == -1) {
        return 0;
    }
    return m[x][y];
}

function countBeside(m, x, y) {
    var result = 0;
    for (var i = x - 2; i <= x + 2; i++) {
        result = result + parseInt(getRoot(m, i, y));
    }
    for (var j = y - 2; j <= y + 2; j++) {
        result = result + parseInt(getRoot(m, x, j));
    }
    result = result - m[x][y] - m[x][y];
    return result;
};

function updataMatrix(x) {
    y = new Array();
    var root
    for (var i = 0; i < column; i++) {
        y[i] = new Array();
        for (var j = 0; j < row; j++) {
            if (x[i][j] == -1) {
                y[i][j] = -1;
                continue;
            }
            root = countBeside(x, i, j)
            if (root == 2) {
                y[i][j] = x[i][j];
            }
            else if (root == 3) {
                y[i][j] = 1;
            }
            else {
                y[i][j] = 0;
            }
        }
    }
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < column; j++) {
            x[i][j] = y[i][j];
        }
    }
};

//draw function-------------------------------------------------------------------------------------------------------------------------------------------------------
function draw_map_original() {
    var cmap = $('#map');
    cmap.attr("width", column * cell_width + "px");
    cmap.attr("height", row * cell_height + "px");
    var context = cmap[0].getContext("2d");
    context.lineWidth = 1;
    for (var i = 1; i < column; i++) {
        context.moveTo(i * cell_width, 0);
        context.lineTo(i * cell_width, row * cell_height);
        context.stroke();
    }
    for (var j = 1; j < row; j++) {
        context.moveTo(0, j * cell_height);
        context.lineTo(column * cell_width, j * cell_height);
        context.stroke();
    }
};

//draw map calculated
function draw_map_calculated(map) {
    var cmap = $('#map');
    var context = cmap[0].getContext("2d");
    for (var i = 0; i < column; i++) {
        for (var j = 0; j < row; j++) {
            if (map[i][j] == 1) {
                context.fillStyle = "black";//black
                context.fillRect(i * cell_height + 1, j * cell_width + 1, cell_height - 1, cell_width - 1);
            }
            else if (map[i][j] == 0){
                context.fillStyle = "silver";//silver
                context.fillRect(i * cell_height + 1, j * cell_width + 1, cell_height - 1, cell_width - 1);
            }
            else {
                context.fillStyle = "red";//silver
                context.fillRect(i * cell_height + 1, j * cell_width + 1, cell_height - 1, cell_width - 1);
            }
        };
    };
};