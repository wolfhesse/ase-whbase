/**
 *  TODO: review
 *  mClient muss '.socket' besitzen.. is ein bissl viel verlangt
 *
 */
var module = []; module.exports=[]; // wir sind hier im browser...

var self = module.exports.Reporter = reporter = Reporter = {
    mClient: null,
    Reporter: function (client) {
        self.mClient = client;
    }
    , emit_and_log: function (args) {
        self.mClient.socket.emit(args);
        console.log('Reporter emitting:', JSON.stringify(args));
    }
    , log: function (args) {
        console.log("Reporter @ " + (new Date()) + ": " + JSON.stringify(args));
    }
    , status: function (where, args) {
        // inspection: empty tag doesn't work in some browsers
        where.html($('<div ></div>').text('reporting status: ' + JSON.stringify(args)));
    }
};
