git() {
  ARGS=$@
  while [ $# -ne 0 ]
  do
      if [ "$1" == "pull" ]
      then
        echo "Cannot pull!"
        return;
      fi
      shift
  done
  command git $ARGS
}
