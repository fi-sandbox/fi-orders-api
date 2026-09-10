# fi-orders-api

Orders API — order processing service (Node.js/Express), high test coverage

## Structure

```
package.json
README.md
.gitignore
src/                        source modules
tests/                      Jest test suite
.github/workflows/ci.yml    CI: build matrix (Node 20.x / 22.x) + coverage PR comment
.github/dependabot.yml      weekly dependency updates (npm, github-actions)
```

## Development

```bash
npm install
npm test -- --coverage
```