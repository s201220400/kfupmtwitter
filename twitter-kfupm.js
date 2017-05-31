var Twitter = require('twitter');

module.exports = function(response, tweets_number){
    var client = new Twitter({
        consumer_key: 'JKSB1EiRIi1K89GhZQXVo4QkE',
        consumer_secret: 'gBAtw3qv2TvLpVZINfQ2kWyoHRi8SQhxwqwDL0m1z2N0d3Uarj',
        access_token_key: '857650470541811712-tvOLC20OI7bC2rZ7cAZJDg2lAYBkPQl',
        access_token_secret: 'Q0G7OglhIF6UpcuO128M8AOhbhgEHxrLIczIe04qNI3tW'
    });

    var params = {
        q: 'KFUPM',
        count: tweets_number + 5,
        include_entities: "media= false, urls= false, user_mentions= true, hashtags= false, symbols= true, extended_entities= false"
    };

    var tweets_records = [];

    client.get('search/tweets', params, function(error, tweets, res) {
        if (error) throw error;

        var result_str = JSON.stringify(tweets);
        var result = JSON.parse(result_str);
        
        result["statuses"].forEach(function(element) {
            var records = {
                name: element["user"]["name"],
                screen_name: '@' + element["user"]["screen_name"],
                image: element["user"]["profile_image_url"],
                text: element["text"]
            };

            tweets_records.push(records);
        });

        response.render('tweets', {tweet: tweets_records, tweet_count: String(params.count)})
    });
}