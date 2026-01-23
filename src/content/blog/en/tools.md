---
id: tools-making-story
title: The Making of 〈Tools〉 An All-in-One Toolkit for Publishing Editors
date: Jan 22, 2026
category: Making Story
---

<img src ="/assets/tools_02.jpg">

‘Tools’ is a web service created under the concept of an ‘All-in-One Workflow Toolkit for Publishing Editors.’ This project began with a proposal from the publishing editor community, ‘Editor's Room.’ After launching the community, they faced a familiar challenge:
“We need a reason for people to keep coming back.” Their answer was to gather web-based tools that would be genuinely helpful for an editor's daily work, and they proposed the implementation of this idea to HACO & KEBU.
&nbsp;

&nbsp; 

## Planning Rooted in the Voices of Professionals
<img src ="/assets/tools_19.jpg">
As HACO & KEBU, we didn’t have first-hand experience with the day-to-day tasks of publishing editors. so we couldn't build these tools based on imagination alone. We conducted interviews with working editors and, through that process, planned six core editorial tools. While speaking with them, one thing became clear: editors are, in many ways, office workers like anyone else. Therefore, in addition to specialized editorial tools, we decided to develop features like a ‘Tenure Calculator’ and a ‘Net Salary Table’—the kind of resources people find themselves searching for quite often. Furthermore, we included a bookmark page that aggregates useful websites for editors.
&nbsp;

&nbsp; 

## Planning → Prototype → Review → Iteration

I was responsible for the detailed feature planning, created a prototype, and then received feedback from editors. This review process led to several crucial improvements, such as:
<img src ="/assets/tools_20.jpg">
- A ‘One-click Copy’ feature for book spine calculations and character counts.
- Displaying the count in ‘Manuscript Paper Sheets’ (wongoji) for character counts.
- Providing guidance on image file extensions when generating QR codes.

These were details we would likely have missed without direct feedback from real editors. Through multiple rounds of review, improvement, and implementation, the service evolved into its current form.
&nbsp;

&nbsp; 

## Keeping Technology as Simple as Possible

For this project, I deliberately avoided overengineering the tech stack. Looking at the service specifications, there was no compelling reason to use the latest, most complex technologies. Instead, I stuck to HTML, CSS, and using vanilla JavaScript as much as possible. This was a choice made to minimize future maintenance issues.
<img src ="/assets/tools_21.jpg">
For features requiring data persistence, I used Local Storage, and for sections like bookmarks that require data management, I utilized JSON files. Again, these choices were made to ensure ease of maintenance.
&nbsp;

&nbsp; 

## Concise and Reusable Design
<img src ="/assets/tools_22.jpg">
The design criteria were also clear: simplicity and reusability.

I wanted design elements developed for one page to be easily applicable to others. I designed the system so that new tools can be added without cluttering the interface. and will maintain a consistent look and feel.
&nbsp;

&nbsp; 

## Deployment: Ultimately Settling on GitHub

Initially, I chose Netlify Drop for deployment, thinking it would be easy for someone without a strong technical background to manage. However, I soon ran into issues. I couldn't modify or replace specific files on the server directly; any minor change required re-uploading the entire service. This quickly became inconvenient during active development. so I eventually switched to a GitHub-connected deployment workflow.
&nbsp;

&nbsp; 

## The Fun Part: Book Size Comparison Table

The most enjoyable challenge was the book size comparison feature. Simply showing numbers felt no different from existing data, and showing only images lacked precision. The solution I came up with was a structure where the specific trim size appears visually when you hover over the table.
<img src ="/assets/tools_23.jpg">
I brainstormed how to solve this technically and landed on the simplest approach: creating individual images for each trim size and displaying the corresponding image on hover. Despite its technical simplicity, it creates a surprisingly fun and engaging interaction.
&nbsp;

&nbsp; 

## The Hardest Part: Data Collection

Looking back, gathering the data was more difficult than the technical implementation.

Book spine calculations require precise paper thickness data. However, most paper manufacturers only officially provide the ‘basis weight’ (g/㎡) and not the actual thickness. Consequently, I could only include well-known papers whose thickness information was publicly available online.

Selecting representative books for each trim size was also a hurdle. Since bookstores don't typically allow you to search for books by their physical dimensions, I had to manually cross-reference book sizes to select examples. The very problem this tool was meant to solve became the obstacle to building it! (This is why most sizes have six examples, but the Gukbae-pan and Tabloid sizes only have three—I simply couldn't find more.)

Finally, as mentioned earlier, Tools manages data via JSON for maintenance. While adding items one by one isn't difficult, the process of manually populating the initial dataset was quite tedious.
&nbsp;

&nbsp; 

## Closing Thoughts

Tools wasn't built with flashy technology, but I prioritized one question above all: “Will this actually be useful?” My hope is that Tools becomes a practical, everyday companion for editors.
&nbsp;

&nbsp; 

<hr>
<br>

## Don’t miss the next post.

· <a href="https://hacokebu.com/rss.xml" target="_blank">Subscribe via RSS</a>
