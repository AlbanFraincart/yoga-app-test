function cov_57pfqclmg() {
  var path = "C:\\Users\\alban\\Documents\\oc\\projets\\Projet5\\Testez-une-application-full-stack\\front\\src\\main.ts";
  var hash = "222ea533c2f4b1abd9116c473807520d3fdb64ce";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\Users\\alban\\Documents\\oc\\projets\\Projet5\\Testez-une-application-full-stack\\front\\src\\main.ts",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 9,
          column: 1
        }
      },
      "1": {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 8,
          column: 19
        }
      },
      "2": {
        start: {
          line: 11,
          column: 0
        },
        end: {
          line: 12,
          column: 36
        }
      },
      "3": {
        start: {
          line: 12,
          column: 16
        },
        end: {
          line: 12,
          column: 34
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 12,
            column: 9
          },
          end: {
            line: 12,
            column: 10
          }
        },
        loc: {
          start: {
            line: 12,
            column: 16
          },
          end: {
            line: 12,
            column: 34
          }
        },
        line: 12
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 7,
            column: 0
          },
          end: {
            line: 9,
            column: 1
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 7,
            column: 0
          },
          end: {
            line: 9,
            column: 1
          }
        }, {
          start: {
            line: 7,
            column: 0
          },
          end: {
            line: 9,
            column: 1
          }
        }],
        line: 7
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "222ea533c2f4b1abd9116c473807520d3fdb64ce"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_57pfqclmg = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_57pfqclmg();
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
cov_57pfqclmg().s[0]++;

if (environment.production) {
  cov_57pfqclmg().b[0][0]++;
  cov_57pfqclmg().s[1]++;
  enableProdMode();
} else {
  cov_57pfqclmg().b[0][1]++;
}

cov_57pfqclmg().s[2]++;
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => {
  cov_57pfqclmg().f[0]++;
  cov_57pfqclmg().s[3]++;
  return console.error(err);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJlbmFibGVQcm9kTW9kZSIsInBsYXRmb3JtQnJvd3NlckR5bmFtaWMiLCJBcHBNb2R1bGUiLCJlbnZpcm9ubWVudCIsInByb2R1Y3Rpb24iLCJib290c3RyYXBNb2R1bGUiLCJjYXRjaCIsImVyciIsImNvbnNvbGUiLCJlcnJvciJdLCJzb3VyY2VzIjpbIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZW5hYmxlUHJvZE1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgcGxhdGZvcm1Ccm93c2VyRHluYW1pYyB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYyc7XHJcblxyXG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL2FwcC9hcHAubW9kdWxlJztcclxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XHJcblxyXG5pZiAoZW52aXJvbm1lbnQucHJvZHVjdGlvbikge1xyXG4gIGVuYWJsZVByb2RNb2RlKCk7XHJcbn1cclxuXHJcbnBsYXRmb3JtQnJvd3NlckR5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlKVxyXG4gIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7Ozs7Ozs7OztBQWZaLFNBQVNBLGNBQVQsUUFBK0IsZUFBL0I7QUFDQSxTQUFTQyxzQkFBVCxRQUF1QyxtQ0FBdkM7QUFFQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUNBLFNBQVNDLFdBQVQsUUFBNEIsNEJBQTVCOzs7QUFFQSxJQUFJQSxXQUFXLENBQUNDLFVBQWhCLEVBQTRCO0VBQUE7RUFBQTtFQUMxQkosY0FBYztBQUNmLENBRkQ7RUFBQTtBQUFBOzs7QUFJQUMsc0JBQXNCLEdBQUdJLGVBQXpCLENBQXlDSCxTQUF6QyxFQUNHSSxLQURILENBQ1NDLEdBQUcsSUFBSTtFQUFBO0VBQUE7RUFBQSxPQUFBQyxPQUFPLENBQUNDLEtBQVIsQ0FBY0YsR0FBZDtBQUFrQixDQURsQyJ9