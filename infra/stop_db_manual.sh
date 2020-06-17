for OUTPUT in $(ls ./db_containers_manual)
do
	kubectl delete -f  ./db_containers_manual/$OUTPUT
done

