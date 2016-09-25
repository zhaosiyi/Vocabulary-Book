var word;

function render(){
    $('#book-list a').addClass('blue-text unselectable waves-effect waves-orange').click(function(event){
        $('#book-list a').each(function(){
            if(this===event.target) $(this).addClass('selected-list');
            else $(this).removeClass('selected-list');
        });
    });

    $('.word>span').addClass('blue-text normal-cursor');
}

$(document).ready(function(){
    render();
    word= JSON.parse($('#data').text()).sort(function(a, b){
        return a.name<b.name;
    });
    console.log(word);
    $('#search').on('keyup',function(event){
        var key= $('#search').val();
        var result= [];
        if(key!==''){
            for(var i in word){
                var now= word[i];
                var name= now.name;
                var ans= fuzzy_match(key, name);
                //console.log(key, name, ans);
                if(ans[0]===true){
                    //now.name= ans[2];
                    now.score= ans[1];
                    result.push(now);
                }
            }
            result.sort(function(a, b){
                return a.score<b.score;
            });        
        }
        else{
            result= word;
        }
        
        if(result.length===0){
            $('#book-content>ul').html('<li>No result</li>');
        }
        else{
            var content= '';
            for(var i in result){
                var now= result[i];
                content+= '<li><div class="word"><span>'+now.name+'</span><button><i class="small material-icons">volume_up</i></button></div><div class="exp">'+now.exp+'</div></li>';
            }
            $('#book-content>ul').html(content);
        }
        render();
    });

    $('#return-top').click(function(){
        $('body,html').animate({scrollTop:0},200);  
        return false;  
    });

});