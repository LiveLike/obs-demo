$(document).ready(function() {
  const player = IVSPlayer.create();
  player.attachHTMLVideoElement(document.getElementById("video"));
  player.load("https://cc49205dccc9.us-east-1.playback.live-video.net/api/video/v1/us-east-1.091895250436.channel.Ac37LCsw2dWq.m3u8");
  player.play();

  const container = document.querySelector('.livelike-container');
  const cheerWidget = document.createElement('livelike-cheer-meter');
  cheerWidget.setAttribute('widgetid', "8e19d5ef-c2ee-4891-a457-b6fa75d28400");
  cheerWidget.mode = function() {
    cheerWidget.widgetPayload.timeout = null;
    cheerWidget.interactive()
  }
  container.appendChild(cheerWidget);

  const avatarChoices = ["alabama_small.png", "clemson_small.png"];
  const avatarUrl = avatarChoices[Math.floor(Math.random() * avatarChoices.length)];
  $("livelike-chat").attr("avatarurl", avatarUrl);

  LiveLike.init({
    clientId: "J97YLOHQ5sMGzww1BHivAEP0dUIfRgFl6ilg3asf"
  })
});
