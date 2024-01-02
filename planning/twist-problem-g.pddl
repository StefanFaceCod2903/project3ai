(define (problem twisting-g)
  (:domain alpha-twist)
  (:objects 
    f r b l
    arm0 arm1 arm2 arm3
  )
  (:init
    (next-pos f r) 
    (next-pos r b) 
    (next-pos b l) 
    (next-pos l f) 

    (arm-at arm0 f)
(arm-at arm1 f)
(arm-at arm2 r)
(arm-at arm3 l)
  )
  (:goal 
    (and 
        (arm-at arm0 l)
(arm-at arm1 f)
(arm-at arm2 f)
(arm-at arm3 r)
    )
  )
)
