for OUTPUT in $(ls ./db_containers_manual)
do
	kubectl apply -f  ./db_containers_manual/$OUTPUT
done

