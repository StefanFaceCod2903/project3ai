(define (domain alpha-twist)
  (:predicates 
    (arm-at ?a ?p)
    (next-pos ?p1 ?p2)
  )
  (:action rotate
    :parameters (?old-pos ?new-pos ?arm)
    :precondition (and (arm-at ?arm ?old-pos)
                       (next-pos ?old-pos ?new-pos))
    :effect (and (arm-at ?arm ?new-pos)
                 (not (arm-at ?arm ?old-pos)))
  )
)
    
