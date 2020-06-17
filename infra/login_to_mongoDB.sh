POD=$(kubectl get pods -o custom-columns=:metadata.name)
kubectl exec -it $POD mongo
