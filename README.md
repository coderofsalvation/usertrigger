clean user state-handling & triggers based on changes

## Usage:

    <script type='text/javascript' src='usertrigger.min.js'></script>

## Getting started 

    var user = new user()
    user.has("PhD", "input[name=PhD_date_selector]",   'change keyup' )
    user.has("PhD") // returns false

Now after entering a date in the input, it will return true:
    
    user.has("PhD") // returns true

But we could also manually tag/untag it:

    user.set("PhD", true)

> NOTE: a state represents a combination of tags, therefore use the custom queries (see example below) for states.

## Reference

    user.has( tag, domid_or_domid_array, string_with_events )    <-- query tag or initialize
                   --------------------  ------------------      <-- optional

    user.set( tag, true|false  )                                 <-- tag user

    user.on( tag_or_function, function )                         <-- tag eventhandler

## Example: tag user (multiple)

    user.has("lotsofpeople", [
      "input[type=checkbox]#filter_bedrooms_4", 
      "input[type=checkbox]#filter_bedrooms_5" 
    ], 'change' )

## Example: trigger 

    user.on( "lotsofpeople", 
      user.once( // you can leave this wrapper out if you want to run it more than once 
        function(user){
          setTimeout( function(){ 
            alert("It seems you are booking for a group of people.<br>Feel free to chat with our supportdesk to find out a good deal")
          }, 10000 )
        }
      )
    )

## Example: custom query & custom trigger

    user.knowsDates = function(){ 
      return user.has("PhD") && user.has("bachelordegree") 
    }

    user.on( user.knowsDates, 
      user.once( // you can leave this wrapper out if you want to run it more than once 
        function(user){
          alert("It seems you know exactly when you want to stay in <city>, did you know there's <event> during that time?")
        }
      )
    )


