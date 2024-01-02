(define (problem twisting-g)
  (:domain alpha-twist)
  (:objects 
    f r b l
    arm0 arm1
  )
  (:init
    (next-pos f r) 
    (next-pos r b) 
    (next-pos b l) 
    (next-pos l f) 

    (arm-at arm0 r)
(arm-at arm1 r)
  )
  (:goal 
    (and 
        (arm-at arm0 f)
(arm-at arm1 l)
    )
  )
)
