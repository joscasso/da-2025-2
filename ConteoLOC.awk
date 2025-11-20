git log --pretty=format:'<AUTHOR>%aN' --numstat | awk '
  /^<AUTHOR>/ {
    author = substr($0, length("<AUTHOR>") + 1); 
    next
  }
  /^[0-9]/ {
    added[author] += $1; 
    deleted[author] += $2; 
    next
  }
  END {
    for (a in added) {
      print added[a], deleted[a], a
    }
  }' | sort -nr