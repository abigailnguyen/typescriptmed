Useful git commands:

| Command                                         |                                                                      Explanation |                                           Usage |
| :---------------------------------------------- | -------------------------------------------------------------------------------: | ----------------------------------------------: |
| git config --global alias.ac "commit -am"       |                             Add a global alias to add and commit with a message. |                                   git ac "Nice" |
| git commit --amend -m                           |                                             Amend the message of the last commit |           git commit --amend -m "Amend message" |
| git commit --amend --no-edit                    |                                  Locally add additional files to the last commit |       git add . && git commit --amend --no-edit |
| git revert                                      |            Revert the unwanted commit and reset the branch to the previous state |                        git revert <commit hash> |
| git log --oneline                               |                                            Show the history of commits condensed |                                                 |
| git branch -M mucho                             |                                                           Rename git branhc main |                              git branch -M main |
| git log --graph --online --decorate             |                  To view the history of commits in terminal with dotted and dash |                                                 |
| git bisect                                      |                     Walk through and mark good commits until finding the bad one |    git bisect start :  bad : good <commit hash> |
| git rebase main --interactive                   |                          On feature branch, rebase the main branch interactively | Change from `pick` to `squash` to squash commit |
| git commit --fixup <hash>                       |                                       Commit on your branch to set up for rebase |                                                 |
| git commit --squash <hash>                      |                                      Commit on your branch to set tup for rebase |                                                 |
| git rebase -i --autosquash                      |  All the commits marked with `fixup` and `squash` will be squashed when rebasing |                                                 |
| git hooks                                       |                                             Set up action before each git action |                                                 |
| git fetch origin * git reset --hard origin/main | Go back to the original state of the remote repo when your local is not too well |                                                 |
| git clean -df                                   |                           Clean all the files linger around after the hard reset |                                                 |
| git checkout -                                  |      Go back to the previous branch you were working on if you forgot what it is |
| git config --global --unset alias.trololo       |                                                                   Unset an alias |
| git config --global --get-regexp "^alias\."     |                                                           grab all the git alias |
| git config --global --unset-all                 |                                                          Unset all the variables |

For Husky
```
npm i -D husky
npm set-script prepare "husky install"
npm run prepare
npm husky add ./husky/pre-commit "npm test"
git add .husky/pre-commit
```
