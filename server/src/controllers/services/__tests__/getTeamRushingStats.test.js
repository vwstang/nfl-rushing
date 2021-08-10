const processTeamRushingStats = require("../index").processTeamRushingStats;

const testCase1 = [
  {
    Player: "Terrell Watson",
    Team: "PHI",
    Pos: "RB",
    Att: 9,
    "Att/G": 9,
    Yds: 28,
    Avg: 3.1,
    "Yds/G": 28,
    TD: 1,
    Lng: "8",
    "1st": 2,
    "1st%": 22.2,
    "20+": 0,
    "40+": 0,
    FUM: 0
  },
  {
    Player: "Matt Asiata",
    Team: "PHI",
    Pos: "RB",
    Att: 121,
    "Att/G": 7.6,
    Yds: 402,
    Avg: 3.3,
    "Yds/G": 25.1,
    TD: 6,
    Lng: "29",
    "1st": 27,
    "1st%": 22.3,
    "20+": 2,
    "40+": 0,
    FUM: 1
  },
  {
    Player: "Ted Ginn",
    Team: "CAR",
    Pos: "WR",
    Att: 14,
    "Att/G": 0.9,
    Yds: 98,
    Avg: 7,
    "Yds/G": 6.1,
    TD: 0,
    Lng: "20",
    "1st": 4,
    "1st%": 28.6,
    "20+": 1,
    "40+": 0,
    FUM: 0
  },
  {
    Player: "Marqise Lee",
    Team: "CAR",
    Pos: "WR",
    Att: 6,
    "Att/G": 0.4,
    Yds: 35,
    Avg: 5.8,
    "Yds/G": 2.2,
    TD: 0,
    Lng: "11",
    "1st": 2,
    "1st%": 33.3,
    "20+": 0,
    "40+": 0,
    FUM: 0
  },
  {
    Player: "Josh McCown",
    Team: "CLE",
    Pos: "QB",
    Att: 7,
    "Att/G": 1.4,
    Yds: 21,
    Avg: 3,
    "Yds/G": 4.2,
    TD: 0,
    Lng: "7",
    "1st": 0,
    "1st%": 0,
    "20+": 0,
    "40+": 0,
    FUM: 2
  }
];

const testCase2 = [
  {
    Player: "Terrell Watson",
    Team: "PHI",
    Pos: "RB",
    Att: 9,
    "Att/G": 9,
    Yds: "1,234",
    Avg: 3.1,
    "Yds/G": 28,
    TD: 1,
    Lng: "8",
    "1st": 2,
    "1st%": 22.2,
    "20+": 0,
    "40+": 0,
    FUM: 0
  },
  {
    Player: "Matt Asiata",
    Team: "PHI",
    Pos: "RB",
    Att: 121,
    "Att/G": 7.6,
    Yds: 402,
    Avg: 3.3,
    "Yds/G": 25.1,
    TD: 6,
    Lng: "29",
    "1st": 27,
    "1st%": 22.3,
    "20+": 2,
    "40+": 0,
    FUM: 1
  }
];

describe("processTeamRushingStats function", () => {
  it("returns total rushing yards by team", () => {
    const result = processTeamRushingStats(testCase1);
    expect(result).toEqual({
      PHI: 28 + 402,
      CAR: 98 + 35,
      CLE: 21
    });
  });
  it("returns total rushing yards by team and parses strings properly", () => {
    const result = processTeamRushingStats(testCase2);
    expect(result).toEqual({
      PHI: 1234 + 402
    });
  });
  it("returns empty object if allStats is passed an empty array", () => {
    const result = processTeamRushingStats([]);
    expect(result).toEqual({});
  });
});
