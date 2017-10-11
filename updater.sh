#! /bin/sh
if [ ! -f upd.last ]; then
    notify-send "NFE Updater" "This is the first time you run NFE, fetching update datas." 
#get the rss
wget https://nfeteam.org/forum/forums/arcticfox-releases/index.rss 
#grep lines
grep -E  'P** ArcticFox *' index.rss > upd.tmp
#Strip tags 
sed -e 's/<[a-zA-Z\/][^>]*>//g' upd.tmp > upd.tmp2
sed '1d' upd.tmp2 > upd.tmp
sed -r 's/\s+//g' upd.tmp > upd.tmp2
head -n 1 upd.tmp2 > upd.check

notify-send "NFE Updater" "Latest version is: $(cat upd.check)"
cp upd.check upd.last
rm index.rss
rm -rf upd.t*
rm -rf upd.c*
else

notify-send "NFE Updater" "Fetching updates..." 
wget https://nfeteam.org/forum/forums/arcticfox-releases/index.rss 
#grep lines
grep -E  'P** ArcticFox *' index.rss > upd.tmp
#Strip tags 
sed -e 's/<[a-zA-Z\/][^>]*>//g' upd.tmp > upd.tmp2
sed '1d' upd.tmp2 > upd.tmp
sed -r 's/\s+//g' upd.tmp > upd.tmp2
head -n 1 upd.tmp2 > upd.tmp
sed -r 's/\s+//g' upd.tmp > upd.check
if cmp -s "upd.check" "upd.last"
then
   notify-send "NFE Updater" "There is no updates."
else
   notify-send "NFE Updater" "There's an upgrade since last check. \nThe current version is: $(cat upd.check)"
fi
rm -rf index.*
rm -rf upd.t*
rm -rf upd.c*
fi
