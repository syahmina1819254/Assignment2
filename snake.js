var snakes=new Array([15,5],[23,16]);
var ladders=new Array([8,15],[19,24]);
var playersteps;


function draw(num)
{
  var str="<table border=\"1\" bgcolor=\"#8A2BE2\">";
  var x=num*num,y;
  for(i=1;i<=num;i++)
  {
    str+="<tr height=\"70\">";
    if(num%2==0)
    {
      if(i%2!=0)
      {
        x=x-num+1;
        for(j=0;j<num;j++,x++)
        {
          str+="<td width=\"70\" align=\"center\" id=\""+x+"\">"+x+"</td>";
        }
      }
      else
      {
        x=x-num-1;
        for(j=0;j<num;j++,x--)
        {
          str+="<td width=\"70\" align=\"center\" id=\""+x+"\">"+x+"</td>";
        }
      }
    }
    else
    {
      if(i%2!=0)
      {
        if(i!=1)
        {
          x=x-num-1;
        }
        for(j=0;j<num;j++,x--)
          str+="<td width=\"70\" align=\"center\" id=\""+x+"\">"+x+"</td>";
      }
      else
      {
        x=x-num+1;
        for(j=0;j<num;j++,x++)
          str+="<td width=\"70\" align=\"center\" id=\""+x+"\">"+x+"</td>";
      }
    }
    str+="</tr>";
  }
  str+="</table>";

  document.getElementById("board").innerHTML=str;

}


function Startbuttons()
{
  totalplayers=2;

  str=" ";
  for(i=0;i<totalplayers;i++)
  {
    if(i==0)
      str+="<img src=\"images/coin"+(i+1)+".png\"></img><input type=\"button\" value=\"player "+(i+1)+"\" id=\"btn"+i+"\" onclick=\"startplay(5,"+i+")\"><br/>";
    else
      str+="<img src=\"images/coin"+(i+1)+".png\" ></img><input type=\"button\" value=\"player "+(i+1)+"\" id=\"btn"+i+"\" onclick=\"startplay(5,"+i+")\" disabled=\"true\"><br/>";
  }
  document.getElementById("playerbtn").innerHTML =str;
  playersteps=new Array(totalplayers);
  for(i=0;i<totalplayers;i++)
    playersteps[i]=0;
  document.getElementById("okbtn").disabled=true;

}

// Use Math.random() to simulate the roll of a die.
function rolldice()
{
  dice=Math.ceil((Math.random() * 6));
  document.getElementById("youRoll").innerHTML="You Roll  " + dice;
  console.log("You roll  " + dice );
}

// R1; Use arrays to keep the current position of 2 players.
function startplay(num,playernum)
{
  rolldice();
  oldstep=playersteps[playernum];
  playersteps[playernum]+=dice;


  document.getElementById("btn"+playernum).disabled=true;
  chk=-1;
  i=playernum;
  do
  {
    i++;
    if(i==playersteps.length)
      i=0;
    if(playersteps[i]>=0)
    {
      document.getElementById("btn"+i).disabled=false;
      break;
    }
    else
      document.getElementById("btn"+i).disabled=true;
  }while(i!=playernum);





  for(i=0;i<ladders.length;i++)
  {
    if(playersteps[playernum]==ladders[i][0])
    {
      prevblock=playersteps[playernum];
      playersteps[playernum]=ladders[i][1];
      console.log("You advance from" + prevblock + " to " + playersteps[playernum]);
      break;
    }
  }


  for(i=0;i<snakes.length;i++)
  {
    if(playersteps[playernum]==snakes[i][0])
    {
      prevblock=playersteps[playernum];
      playersteps[playernum]=snakes[i][1];
        console.log("You fall from" + prevblock + " to " + playersteps[playernum]);
      break;
    }
  }




  if(playersteps[playernum]<(num*num))
  {
    if(oldstep!=0)
    {
      str=oldstep;
      for(i=0;i<playersteps.length;i++)
      {
        if(playersteps[i]==oldstep)
          str+="<img src=\"images/coin"+(i+1)+".png\"></img>"
      }
      document.getElementById(oldstep).innerHTML=str;
    }
    str=playersteps[playernum];
    for(i=0;i<playersteps.length;i++)
    {
      if(playersteps[i]==playersteps[playernum])
        str+="<img src=\"images/coin"+(i+1)+".png\"></img>"
    }
    document.getElementById(playersteps[playernum]).innerHTML=str;
  }
  else if(playersteps[playernum]>=25)
  {
    alert("Congrats: Player"+(playernum+1)+" Won.");
    draw(5);
  }
  else
    playersteps[playernum]=oldstep;
}
