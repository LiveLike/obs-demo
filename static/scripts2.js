$(document).ready(function() {
  const container = document.querySelector('.livelike-container');
  const cheerWidget = document.createElement('livelike-cheer-meter');
  cheerWidget.setAttribute('widgetid', "8e19d5ef-c2ee-4891-a457-b6fa75d28400");
  cheerWidget.mode = function() {
    cheerWidget.widgetPayload.timeout = null;
    cheerWidget.interactive()
  }
  container.appendChild(cheerWidget);

  LiveLike.init({
    clientId: "J97YLOHQ5sMGzww1BHivAEP0dUIfRgFl6ilg3asf"
  }).then(function(profile) {
    const chat = $("livelike-chat").get(0);
    const oldMessageReceived = chat.messageReceived;

    chat.messageReceived = function(e) {
      oldMessageReceived(e);
      if (e.message.message.indexOf("!tide") !== -1) {
        $(".team").addClass("d-none");
        $(".tide").removeClass("d-none");
      } else if (e.message.message.indexOf("!tigers") !== -1) {
        $(".team").addClass("d-none");
        $(".tigers").removeClass("d-none");
      } else if (e.message.message.indexOf("!clear") !== -1) {
        $(".team").addClass("d-none");
      }
    }
  });

  const optionIdClasses = {
    "65c44743-6323-4f46-bc47-f1e37ccb066a": "tigers",
    "c3fa56e0-71ff-4bbe-892d-1c81431ce8b8": "tide"
  }

  function debug(msg) {
    $(".debug").text(JSON.stringify(msg, null, 2));
  }

  function getOptionLeaderId(options) {
    let optionLeaderId;
    let optionLeaderVoteCount = 0;

    options.forEach(function(option) {
      if (option.vote_count > optionLeaderVoteCount) {
        optionLeaderId = option.id;
        optionLeaderVoteCount = option.vote_count;
      }
    });

    return optionLeaderId;
  }

  oldOnResults = cheerWidget.onResults;

  cheerWidget.onResults = function(resultsMessage) {
    oldOnResults(resultsMessage);
    const optionLeaderId = getOptionLeaderId(resultsMessage.message.options);
    const cssClass = optionIdClasses[optionLeaderId];

    if (!!cssClass) {
      $(".team").addClass("d-none");
      $("." + cssClass).removeClass("d-none");
    }
  }
});