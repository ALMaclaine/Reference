git() {
  for var in "$@"
  do
    if [ "$var" == "pull" ]
    then
      echo "Do not use git pull!"
      echo "https://coderwall.com/p/jgn6-q/git-pull-is-evil"
      return;
    fi
  done
  command git "$@"
}
