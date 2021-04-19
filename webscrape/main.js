const puppeteer = require("puppeteer");

const LEAGUE_ID = "28920";
const TEAM_ID = "2";
const SEASON_ID = new Date().getFullYear();

async function login() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });

  await page.goto(
    `https://fantasy.espn.com/basketball/team?leagueId=${LEAGUE_ID}&teamId=${TEAM_ID}&seasonId=${SEASON_ID}`,
    { waitUntil: "networkidle0" }
  );
  const heading1 = await page.$eval(
    "body > div > div > div > div",
    (el) => el.textContent
  );
  console.log(heading1);
}

login();
