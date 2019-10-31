git() {
  for var in "$@"
  do
    if [ "$var" == "pull" ]
    then
      printf "Do not use git pull!\n"
      printf "https://coderwall.com/p/jgn6-q/git-pull-is-evil\n"
      return;
    fi
  done
  command git "$@"
}
