<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/berdron_bot_logo.png" alt="Logo" width="auto" height="125">
  </a>

  <h3 align="center">berdron_bot</h3>

  <p align="center">
    A custom Twitch chat bot built by <a href"https://twitch.tv/berdron>Berdron</a> for his stream. 
    <br />
    <!-- <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a> -->
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

</br>




<!-- ABOUT THE PROJECT -->
## About The Project



Berdron_Bot is a custom chat bot designed for Berdron's unique chatting needs. 

This bot contains a unique mix of practical tools and "because I can" tools. 

The core functionality of the this bot is to run a local service that twitch chat users can interact with me directly.

There are many features that allow for interaction in chat or on the stream overlay, but I wanted to extend the experience to the physical spaces as well. For this, I am creating a series of devices that will be connected and controlled by Berdron_Bot. 

One of the most amusing "because I can" features is how the Raspberry Pi will communicate with all these other devices. A NodeRed docker container will broadcast over a local MQTT network. This is completely unnecessary and therefor exactly what was needed. 

</br>
<img src="images/b_b_logo.png" alt="Logo" width="auto" height="50"> 

</br>
</br>

### 🔧  Built With 🔧

* [Node]()
* [Twitch API]()
* [MQTT]()
* [NodeRed]()
* [Docker]()
* [Arduino FastLED]() 


<!-- USAGE EXAMPLES -->
## 🚀 Usage 🚀

Most of the bot commands can be found via `!bbcommands` in twitch chat. I plan to migrate my usages of other bots to the berdron_bot entirely. 

Commands that are being implemented now:
* !bbcommands - send a link to the list of commands, here 
* !setcolor - set the color for yourself in chat
* !getcolor - get the color you have set
* !clearcolor - reset your color -> randomly selected for now
* !set_bot_color - a way to set the color for this Bot, redeemed by channel points
* !aboutbb - get info about the bot, link to here





<!-- ROADMAP -->
## Roadmap


This is the initial tech design I came up with. It will evolve and grow as the bot does.

![Design drawing](images/berdron_bot_design.jpeg)



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request




<!-- CONTACT -->
## Contact

[Berdron](https://twitch.tv/berdron) - [GitHub](https://github.com/scott-olson)

Project Link: [https://github.com/scott-olson/berdron_bot](https://github.com/scott-olson/berdron_bot)




